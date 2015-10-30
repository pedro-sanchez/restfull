package br.com.pedro.restfull.entity;

import br.com.pedro.restfull.generic.IEntidade;

public class Estado implements IEntidade<Long>{

	private Long id;

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

}
