package br.com.pedro.restfull.entity;

import br.com.pedro.restfull.generic.IEntidade;

public class Cidade implements IEntidade<Long>{

	private Long id;

	private Estado estado;

	private String nome;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Estado getEstado() {
		return estado;
	}

	public void setEstado(Estado estado) {
		this.estado = estado;
	}



}
