package is.fun.baby.babygame.model;

import jakarta.persistence.*;

@Entity
public class Guess {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String guesserName;
    private String genderChoice;


    public Guess() {
    }

    public Guess(String guesserName, String genderChoice) {
        this.guesserName = guesserName;
        this.genderChoice = genderChoice;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getGuesserName() {
        return guesserName;
    }

    public void setGuesserName(String guesserName) {
        this.guesserName = guesserName;
    }

    public String getGenderChoice() {
        return genderChoice;
    }

    public void setGenderChoice(String genderChoice) {
        this.genderChoice = genderChoice;
    }
}