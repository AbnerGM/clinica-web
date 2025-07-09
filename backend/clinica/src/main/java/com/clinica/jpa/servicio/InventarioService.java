package com.clinica.jpa.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinica.jpa.modelo.Inventario;
import com.clinica.jpa.repositorio.InventarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class InventarioService {

    @Autowired
    private InventarioRepository inventarioRepository;

    public Inventario crearInventario(Inventario inventario) {
        return inventarioRepository.save(inventario);
    }

    public List<Inventario> obtenerTodoInventario() {
        return inventarioRepository.findAll();
    }

    public Optional<Inventario> obtenerInventarioPorId(Long id) {
        return inventarioRepository.findById(id);
    }

    public List<Inventario> buscarInventarioPorNombre(String nombre) {
        return inventarioRepository.findByProductoNombreContainingIgnoreCase(nombre);
    }

    public void eliminarInventario(Long id) {
        inventarioRepository.deleteById(id);
    }
}
