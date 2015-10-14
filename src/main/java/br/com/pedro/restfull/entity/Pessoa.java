package br.com.pedro.restfull.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import br.com.pedro.restfull.generic.IEntidade;

@Entity
@Table(name = "PESSOA")
@SequenceGenerator(name = "PESSOA_SEQ_ID", sequenceName = "PESSOA_SEQ_ID", allocationSize = 1, initialValue = 1)
public class Pessoa implements IEntidade<Long>{

	@Id	
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PESSOA_SEQ_ID")
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
