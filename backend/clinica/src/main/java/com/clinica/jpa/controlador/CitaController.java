package com.clinica.jpa.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.clinica.jpa.modelo.Cita;
import com.clinica.jpa.modelo.Medico;
import com.clinica.jpa.modelo.Paciente;
import com.clinica.jpa.servicio.CitaService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/citas")
public class CitaController {

    @Autowired
    private CitaService citaService;

    @PostMapping
    public Cita crearCita(@RequestBody Cita cita) {
        return citaService.crearCita(cita);
    }

    @GetMapping
    public List<Cita> obtenerTodasCitas() {
        return citaService.obtenerTodasCitas();
    }

    @GetMapping("/{id}")
    public Optional<Cita> obtenerCitaPorId(@PathVariable Long id) {
        return citaService.obtenerCitaPorId(id);
    }

    @GetMapping("/buscarPorPaciente")
    public List<Cita> buscarCitasPorPaciente(@RequestParam Paciente paciente) {
        return citaService.buscarCitasPorPaciente(paciente);
    }

    @GetMapping("/buscarPorMedico")
    public List<Cita> buscarCitasPorMedico(@RequestParam Medico medico) {
        return citaService.buscarCitasPorMedico(medico);
    }

    @DeleteMapping("/{id}")
    public void eliminarCita(@PathVariable Long id) {
        citaService.eliminarCita(id);
    }

    @PutMapping("/{id}")
    public Cita actualizarEstadoCita(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String nuevoEstado = body.get("estado");
        return citaService.actualizarEstadoCita(id, nuevoEstado);
    }
}
