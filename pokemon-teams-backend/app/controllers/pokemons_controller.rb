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
    pokemon = Pokemon.new(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
    pokemon.trainer = Trainer.find_by(id: params[:trainer_id])
    pokemon.save
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end
end
