class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def show
    pokemon = Pokemon.find(params[:id])
    render json: pokemon
  end

  def create
    pokemon = generatePokemon(params[:trainer_id])
    render json: pokemon
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.delete
    render json: pokemon
  end

  private
  #   def pokemon_params
  #     params.require(:pokemon).permit(:species, :nickname, :trainer_id)
  #   end

  def generatePokemon(trainer_id)
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    Pokemon.create(nickname: name, species: species, trainer_id: trainer_id)
  end
end
