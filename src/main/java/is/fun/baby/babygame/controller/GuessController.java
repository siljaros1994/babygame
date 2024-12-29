package is.fun.baby.babygame.controller;

import is.fun.baby.babygame.model.Guess;
import is.fun.baby.babygame.service.GuessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
public class GuessController {

    private final GuessService guessService;

    @Autowired
    public GuessController(GuessService guessService) {
        this.guessService = guessService;
    }

    @GetMapping("/")
    public String guessForm(Model model) {
        model.addAttribute("guess", new Guess());
        return "guess";
    }

    @PostMapping("/submitGuess")
    public String submitGuess(@ModelAttribute Guess guess, Model model) {
        guessService.saveGuess(guess);
        List<Guess> allGuesses = guessService.getAllGuesses();
        Map<String, Long> genderCounts = allGuesses.stream()
                .collect(Collectors.groupingBy(Guess::getGenderChoice, Collectors.counting()));

        model.addAttribute("boyCount", genderCounts.getOrDefault("boy", 0L));
        model.addAttribute("girlCount", genderCounts.getOrDefault("girl", 0L));
        model.addAttribute("totalGuesses", allGuesses.size());
        return "guess";
    }
}