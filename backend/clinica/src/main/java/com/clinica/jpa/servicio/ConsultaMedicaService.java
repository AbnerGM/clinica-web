package com.clinica.jpa.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinica.jpa.modelo.ConsultaMedica;
import com.clinica.jpa.modelo.Medico;
import com.clinica.jpa.modelo.Paciente;
import com.clinica.jpa.repositorio.ConsultaMedicaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ConsultaMedicaService {

    @Autowired
    private ConsultaMedicaRepository consultaMedicaRepository;

    public ConsultaMedica crearConsultaMedica(ConsultaMedica consultaMedica) {
        return consultaMedicaRepository.save(consultaMedica);
    }

    public List<ConsultaMedica> obtenerTodasConsultas() {
        return consultaMedicaRepository.findAll();
    }

    public Optional<ConsultaMedica> obtenerConsultaPorId(Long id) {
        return consultaMedicaRepository.findById(id);
    }

    public List<ConsultaMedica> buscarConsultasPorPaciente(Paciente paciente) {
        return consultaMedicaRepository.findByPaciente(paciente);
    }

    public List<ConsultaMedica> buscarConsultasPorMedico(Medico medico) {
        return consultaMedicaRepository.findByMedico(medico);
    }

    public void eliminarConsulta(Long id) {
        consultaMedicaRepository.deleteById(id);
    }
}
