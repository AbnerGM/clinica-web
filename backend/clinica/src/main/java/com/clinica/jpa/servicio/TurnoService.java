package com.clinica.jpa.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinica.jpa.modelo.Medico;
import com.clinica.jpa.modelo.Turno;
import com.clinica.jpa.repositorio.TurnoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TurnoService {

    @Autowired
    private TurnoRepository turnoRepository;

    public Turno crearTurno(Turno turno) {
        return turnoRepository.save(turno);
    }

    public List<Turno> obtenerTodosTurnos() {
        return turnoRepository.findAll();
    }

    public Optional<Turno> obtenerTurnoPorId(Long id) {
        return turnoRepository.findById(id);
    }

    public List<Turno> buscarTurnosPorMedico(Medico medico) {
        return turnoRepository.findByMedico(medico);
    }

    public void eliminarTurno(Long id) {
        turnoRepository.deleteById(id);
    }
}
