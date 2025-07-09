package com.clinica.jpa.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinica.jpa.modelo.Cita;
import com.clinica.jpa.modelo.Medico;
import com.clinica.jpa.modelo.Paciente;
import com.clinica.jpa.repositorio.CitaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CitaService {

    @Autowired
    private CitaRepository citaRepository;

    public Cita crearCita(Cita cita) {
        return citaRepository.save(cita);
    }

    public List<Cita> obtenerTodasCitas() {
        return citaRepository.findAll();
    }

    public Optional<Cita> obtenerCitaPorId(Long id) {
        return citaRepository.findById(id);
    }

    public List<Cita> buscarCitasPorPaciente(Paciente paciente) {
        return citaRepository.findByPaciente(paciente);
    }

    public List<Cita> buscarCitasPorMedico(Medico medico) {
        return citaRepository.findByMedico(medico);
    }

    public List<Cita> buscarCitasPorEstado(Cita.EstadoCita estado) {
        return citaRepository.findByEstado(estado);
    }

    public void eliminarCita(Long id) {
        citaRepository.deleteById(id);
    }

    public Cita actualizarEstadoCita(Long id, String nuevoEstado) {
        Optional<Cita> optionalCita = citaRepository.findById(id);
        if (optionalCita.isEmpty()) {
            throw new RuntimeException("Cita no encontrada");
        }

        Cita cita = optionalCita.get();

        try {
            Cita.EstadoCita estadoEnum = Cita.EstadoCita.valueOf(nuevoEstado);
            cita.setEstado(estadoEnum);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Estado inválido: " + nuevoEstado);
        }

        return citaRepository.save(cita);
    }
}
