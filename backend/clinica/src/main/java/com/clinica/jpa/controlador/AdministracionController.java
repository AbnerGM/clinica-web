package com.clinica.jpa.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.clinica.jpa.modelo.Administracion;
import com.clinica.jpa.servicio.AdministracionService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/administracion")
public class AdministracionController {

    @Autowired
    private AdministracionService administracionService;

    @PostMapping
    public Administracion crearAdministracion(@RequestBody Administracion administracion) {
        return administracionService.crearAdministracion(administracion);
    }

    @GetMapping
    public List<Administracion> obtenerTodasAdministraciones() {
        return administracionService.obtenerTodasAdministraciones();
    }

    @GetMapping("/{id}")
    public Optional<Administracion> obtenerAdministracionPorId(@PathVariable Long id) {
        return administracionService.obtenerAdministracionPorId(id);
    }

    @GetMapping("/buscarPorNombre")
    public List<Administracion> buscarAdministracionPorNombre(@RequestParam String nombre) {
        return administracionService.buscarAdministracionPorNombre(nombre);
    }

    @DeleteMapping("/{id}")
    public void eliminarAdministracion(@PathVariable Long id) {
        administracionService.eliminarAdministracion(id);
    }
}

