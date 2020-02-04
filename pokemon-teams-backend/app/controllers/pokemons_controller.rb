class PokemonsController < ApplicationController

  def index
    pokemons = Pokemon.all
    render json: PokemonSerializer.new(pokemons).to_serialized_json
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

  def create
    pokemonCount = Trainer.find_by(id: params[:id]).pokemons.length

    if pokemonCount < 6 then
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:id])
      render json: PokemonSerializer.new(pokemon).to_serialized_json
    end

  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id]);
    pokemon.destroy;
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

end