package com.clinica.jpa.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.clinica.jpa.modelo.ConsultaMedica;
import com.clinica.jpa.modelo.Receta;
import com.clinica.jpa.servicio.RecetaService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/recetas")
public class RecetaController {

    @Autowired
    private RecetaService recetaService;

    @PostMapping
    public Receta crearReceta(@RequestBody Receta receta) {
        return recetaService.crearReceta(receta);
    }

    @GetMapping
    public List<Receta> obtenerTodasRecetas() {
        return recetaService.obtenerTodasRecetas();
    }

    @GetMapping("/{id}")
    public Optional<Receta> obtenerRecetaPorId(@PathVariable Long id) {
        return recetaService.obtenerRecetaPorId(id);
    }

    @GetMapping("/buscarPorConsulta")
    public List<Receta> buscarPorConsulta(@RequestParam Long idConsulta) {
        ConsultaMedica consulta = new ConsultaMedica();
        consulta.setIdConsulta(idConsulta);
        return recetaService.buscarRecetasPorConsulta(consulta);
    }

    @GetMapping("/buscarPorMedicamentos")
    public List<Receta> buscarRecetasPorMedicamentos(@RequestParam String medicamentos) {
        return recetaService.buscarRecetasPorMedicamentos(medicamentos);
    }

    @DeleteMapping("/{id}")
    public void eliminarReceta(@PathVariable Long id) {
        recetaService.eliminarReceta(id);
    }
}


