package com.clinica.jpa.controlador;

import com.clinica.jpa.modelo.HistorialMedico;
import com.clinica.jpa.modelo.Paciente;
import com.clinica.jpa.servicio.HistorialMedicoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/historiales")
public class HistorialMedicoController {

    @Autowired
    private HistorialMedicoService historialMedicoService;

    @PostMapping
    public HistorialMedico crearHistorialMedico(@RequestBody HistorialMedico historialMedico) {
        return historialMedicoService.crearHistorialMedico(historialMedico);
    }

    @GetMapping
    public List<HistorialMedico> obtenerTodosHistoriales() {
        return historialMedicoService.obtenerTodosHistoriales();
    }

    @GetMapping("/{id}")
    public Optional<HistorialMedico> obtenerHistorialPorId(@PathVariable Long id) {
        return historialMedicoService.obtenerHistorialPorId(id);
    }

    @GetMapping("/buscarPorPaciente")
    public List<HistorialMedico> buscarHistorialPorPaciente(@RequestParam Long idPaciente) {
        Paciente paciente = new Paciente();
        paciente.setIdPaciente(idPaciente);
        return historialMedicoService.buscarHistorialPorPaciente(paciente);
    }

    @DeleteMapping("/{id}")
    public void eliminarHistorial(@PathVariable Long id) {
        historialMedicoService.eliminarHistorial(id);
    }
}
