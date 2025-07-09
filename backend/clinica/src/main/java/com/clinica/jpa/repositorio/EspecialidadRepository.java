package com.clinica.jpa.repositorio;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.clinica.jpa.modelo.Especialidad;

public interface EspecialidadRepository extends JpaRepository<Especialidad, Long> {
    Optional<Especialidad> findByNombre(String nombre);
    List<Especialidad> findByNombreContainingIgnoreCase(String nombre); // 🔥 esto es lo que necesitas
    
}
