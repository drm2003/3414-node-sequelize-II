# AULA 01

## Delete (exclusão suave)

- Permite excluir o registro sem a devida exclusão.
- Também conhecido por ocultar sem deletar.
- Denominado por paranoid no model do registro, exemplo:

  ` ...
},
{
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
    paranoid: true
}
...`

### Criar migrations

- As migrações devem ter o nome da coluna a ser criada e removida para cada um dos itens
- Os arquivos de migrations deve ter a data, mantendo a sequência após as criações das tabelas

### Executar as migrations

- npx sequelize-cli db:migrate

## Links da aula

    Seguem os links para conteúdos apresentados em vídeo ou citados durante esta aula:

    Documentação do Sequelize: Paranoid; (https://sequelize.org/docs/v6/core-concepts/paranoid/)
    Requisitos do projeto. (https://github.com/alura-cursos/3414-node-sequelize-II/blob/arquivos-iniciais/arquivos-base/requisitos.md)

# AULA 02

## Escopo (scope)

- Serve para definir um escopo padrão, caso não seja informado.
- Escopos definem a abrangência das funcionalidades.
- Exemplo da indicação na tabela pessoa:

  ` ...
},
{
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
    paranoid: true,
    defaultScope: { 
      where: {
        ativo: true
      }
    }
}
...`
