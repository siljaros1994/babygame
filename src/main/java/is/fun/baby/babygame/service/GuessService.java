package is.fun.baby.babygame.service;

import is.fun.baby.babygame.model.Guess;
import is.fun.baby.babygame.repository.GuessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuessService {
    private final GuessRepository guessRepository;

    @Autowired
    public GuessService(GuessRepository guessRepository) {
        this.guessRepository = guessRepository;
    }

    public void saveGuess(Guess guess){
        guessRepository.save(guess);
    }

    public List<Guess> getAllGuesses(){
        return guessRepository.findAll();
    }
}