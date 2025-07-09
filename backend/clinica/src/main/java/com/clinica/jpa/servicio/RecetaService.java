package com.clinica.jpa.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinica.jpa.modelo.ConsultaMedica;
import com.clinica.jpa.modelo.Receta;
import com.clinica.jpa.repositorio.RecetaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RecetaService {

    @Autowired
    private RecetaRepository recetaRepository;

    public Receta crearReceta(Receta receta) {
        return recetaRepository.save(receta);
    }

    public List<Receta> obtenerTodasRecetas() {
        return recetaRepository.findAll();
    }

    public Optional<Receta> obtenerRecetaPorId(Long id) {
        return recetaRepository.findById(id);
    }

    public List<Receta> buscarRecetasPorConsulta(ConsultaMedica consulta) {
        return recetaRepository.findByConsulta(consulta);
    }

    public List<Receta> buscarRecetasPorMedicamentos(String medicamentos) {
        return recetaRepository.findByMedicamentosContainingIgnoreCase(medicamentos);
    }

    public void eliminarReceta(Long id) {
        recetaRepository.deleteById(id);
    }
}

