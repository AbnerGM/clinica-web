package com.clinica.jpa.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import com.clinica.jpa.modelo.Especialidad;
import com.clinica.jpa.servicio.EspecialidadService;


@RestController
@RequestMapping("/api/especialidades")
@CrossOrigin(origins = "http://localhost:5173")
public class EspecialidadController {

    @Autowired
    private EspecialidadService servicio;

    @GetMapping
    public List<Especialidad> listar() {
        return servicio.obtenerTodas();
    }

    @PostMapping
    public Especialidad crear(@RequestBody Especialidad e) {
        return servicio.guardar(e);
    }

    @GetMapping("/{id}")
    public Optional<Especialidad> obtenerPorId(@PathVariable Long id) {
        return servicio.porId(id);
    }

    @GetMapping("/buscar")
    public List<Especialidad> buscarPorNombre(@RequestParam(required = false) String nombre) {
        if (nombre == null || nombre.isBlank()) return List.of();
        return servicio.buscarPorNombreParcial(nombre);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        servicio.eliminar(id);
    }
}
