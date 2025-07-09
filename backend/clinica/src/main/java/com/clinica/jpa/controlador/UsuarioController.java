package com.clinica.jpa.controlador;

import com.clinica.jpa.dto.AuthRequest;
import com.clinica.jpa.modelo.Usuario;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UsuarioController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(), request.getPassword()
            )
        );

        // aca obtiene el usuario autenticado
        Usuario usuario = (Usuario) authentication.getPrincipal();

        // Puedes devolver un DTO o un mapa con info útil
        return ResponseEntity.ok(
            Map.of(
                "mensaje", "Login exitoso",
                "idUsuario", usuario.getIdUsuario(),
                "username", usuario.getUsername(),
                "rol", usuario.getRol().name()
            )
        );
    }

}