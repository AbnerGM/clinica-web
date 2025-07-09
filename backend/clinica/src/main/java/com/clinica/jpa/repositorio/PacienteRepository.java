package com.clinica.jpa.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clinica.jpa.modelo.Paciente;

import java.util.List;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    List<Paciente> findByNombre(String nombre);
    List<Paciente> findByApellido(String apellido);
    List<Paciente> findByDni(String dni);
    List<Paciente> findByGenero(Paciente.Genero genero);
    List<Paciente> findByCorreoElectronico(String correoElectronico);
    List<Paciente> findByTelefono(String telefono);
}

