class PokemonController < ApplicationController
  def index
    pokemon = Pokemon.all
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

  def create
    trainer = Trainer.find_by(id: params[:trainer_id])
    if trainer.pokemon.size > 5
      render json: {error: "can not add anymore pokemon"}
    else
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      newPokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
      render json: newPokemon
    end
  end

  def delete
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy

    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end
end
