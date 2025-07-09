package com.clinica.jpa.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.clinica.jpa.modelo.Medico;
import com.clinica.jpa.modelo.Turno;
import com.clinica.jpa.servicio.TurnoService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/turnos")
public class TurnoController {

    @Autowired
    private TurnoService turnoService;

    @PostMapping
    public Turno crearTurno(@RequestBody Turno turno) {
        return turnoService.crearTurno(turno);
    }

    @GetMapping
    public List<Turno> obtenerTodosTurnos() {
        return turnoService.obtenerTodosTurnos();
    }

    @GetMapping("/{id}")
    public Optional<Turno> obtenerTurnoPorId(@PathVariable Long id) {
        return turnoService.obtenerTurnoPorId(id);
    }


    @GetMapping("/buscarPorMedico")
    public List<Turno> buscarTurnosPorMedico(@RequestParam Long idMedico) {
        Medico medico = new Medico();
        medico.setIdMedico(idMedico);
        return turnoService.buscarTurnosPorMedico(medico);
    }

    @DeleteMapping("/{id}")
    public void eliminarTurno(@PathVariable Long id) {
        turnoService.eliminarTurno(id);
    }
}
