package com.clinica.jpa.servicio;

import com.clinica.jpa.modelo.HistorialMedico;
import com.clinica.jpa.modelo.Paciente;
import com.clinica.jpa.repositorio.HistorialMedicoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HistorialMedicoService {

    @Autowired
    private HistorialMedicoRepository historialMedicoRepository;

    public HistorialMedico crearHistorialMedico(HistorialMedico historialMedico) {
        return historialMedicoRepository.save(historialMedico);
    }

    public List<HistorialMedico> obtenerTodosHistoriales() {
        return historialMedicoRepository.findAll();
    }

    public Optional<HistorialMedico> obtenerHistorialPorId(Long id) {
        return historialMedicoRepository.findById(id);
    }

    public List<HistorialMedico> buscarHistorialPorPaciente(Paciente paciente) {
        return historialMedicoRepository.findByPaciente(paciente);
    }

    public void eliminarHistorial(Long id) {
        historialMedicoRepository.deleteById(id);
    }
}
