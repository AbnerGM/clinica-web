package com.clinica.jpa.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinica.jpa.modelo.Paciente;
import com.clinica.jpa.repositorio.PacienteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    public Paciente crearPaciente(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    public List<Paciente> obtenerTodosPacientes() {
        return pacienteRepository.findAll();
    }

    public Optional<Paciente> obtenerPacientePorId(Long id) {
        return pacienteRepository.findById(id);
    }

    public List<Paciente> buscarPacientePorNombre(String nombre) {
        return pacienteRepository.findByNombre(nombre);
    }

    public List<Paciente> buscarPacientePorApellido(String apellido) {
        return pacienteRepository.findByApellido(apellido);
    }

    public void eliminarPaciente(Long id) {
        pacienteRepository.deleteById(id);
    }
    
    public Paciente actualizarPaciente(Long id, Paciente pacienteActualizado) {
        
        Paciente pacienteExistente = pacienteRepository.findById(id).orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        pacienteExistente.setNombre(pacienteActualizado.getNombre());
        pacienteExistente.setApellido(pacienteActualizado.getApellido());
        pacienteExistente.setDni(pacienteActualizado.getDni());
        pacienteExistente.setFechaNacimiento(pacienteActualizado.getFechaNacimiento());
        pacienteExistente.setDireccion(pacienteActualizado.getDireccion());
        pacienteExistente.setTelefono(pacienteActualizado.getTelefono());
        pacienteExistente.setCorreoElectronico(pacienteActualizado.getCorreoElectronico());
        pacienteExistente.setGenero(pacienteActualizado.getGenero());

        return pacienteRepository.save(pacienteExistente);  // Guarda los cambios en la base de datos
    }
}

