package com.clinica.jpa.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clinica.jpa.modelo.Inventario;

import java.util.List;

@Repository
public interface InventarioRepository extends JpaRepository<Inventario, Long> {

    // Esto por si mas adleante quiero que Busque por nombre exacto 
    List<Inventario> findByProducto_Nombre(String nombre);

    // aca puse para buscar  ignorando mayúsculas/minúsculas y por coincidencias parciales
    List<Inventario> findByProductoNombreContainingIgnoreCase(String nombre);
}
