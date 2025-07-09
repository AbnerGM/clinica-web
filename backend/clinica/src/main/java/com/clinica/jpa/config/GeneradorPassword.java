package com.clinica.jpa.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class GeneradorPassword {

    @Bean
    public CommandLineRunner generarPassword() {
        return args -> {
            String rawPassword = "123456"; 
            String encodedPassword = new BCryptPasswordEncoder().encode(rawPassword);
            System.out.println("Contraseña codificada para BD:");
            System.out.println(encodedPassword);
        };
    }
}
