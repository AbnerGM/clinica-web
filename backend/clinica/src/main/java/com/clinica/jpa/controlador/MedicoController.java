package com.clinica.jpa.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.clinica.jpa.modelo.Medico;
import com.clinica.jpa.servicio.MedicoService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/medicos")
public class MedicoController {

    @Autowired
    private MedicoService medicoService;

    @PostMapping
    public Medico crearMedico(@RequestBody Medico medico) {
        return medicoService.crearMedico(medico);
    }

    @PutMapping("/{id}")
    public Medico actualizarMedico(@PathVariable Long id, @RequestBody Medico medico) {
        return medicoService.actualizarMedico(id, medico);
    }

    @GetMapping
    public List<Medico> obtenerTodosMedicos() {
        return medicoService.obtenerTodosMedicos();
    }

    @GetMapping("/{id}")
    public Optional<Medico> obtenerMedicoPorId(@PathVariable Long id) {
        return medicoService.obtenerMedicoPorId(id);
    }

    @GetMapping("/buscarPorNombre")
    public List<Medico> buscarMedicoPorNombre(@RequestParam String nombre) {
        return medicoService.buscarMedicoPorNombre(nombre);
    }

    @GetMapping("/buscarPorEspecialidad")
    public List<Medico> buscarMedicoPorEspecialidad(@RequestParam String especialidad) {
        return medicoService.buscarMedicoPorEspecialidad(especialidad);
    }

    @DeleteMapping("/{id}")
    public void eliminarMedico(@PathVariable Long id) {
        medicoService.eliminarMedico(id);
    }
}
