package com.clinica.jpa.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.clinica.jpa.modelo.Inventario;
import com.clinica.jpa.servicio.InventarioService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/inventarios")
public class InventarioController {

    @Autowired
    private InventarioService inventarioService;

    @PostMapping
    public Inventario crearInventario(@RequestBody Inventario inventario) {
        return inventarioService.crearInventario(inventario);
    }

    @GetMapping
    public List<Inventario> obtenerTodoInventario() {
        return inventarioService.obtenerTodoInventario();
    }

    @GetMapping("/{id}")
    public Optional<Inventario> obtenerInventarioPorId(@PathVariable Long id) {
        return inventarioService.obtenerInventarioPorId(id);
    }

    @GetMapping("/buscarPorNombre")
    public List<Inventario> buscarInventarioPorNombre(@RequestParam String nombre) {
        return inventarioService.buscarInventarioPorNombre(nombre);
    }

    @DeleteMapping("/{id}")
    public void eliminarInventario(@PathVariable Long id) {
        inventarioService.eliminarInventario(id);
    }
}

