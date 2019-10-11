class PokemonsController < ApplicationController
	def index
    pokemons = Pokemon.all
    render json: PokemonSerializer.new(pokemons)
  end

  def new 
    pokemon = Pokemon.new
  end

  def show  
  	pokemon = Pokemon.find_by(id: params[:id])
    render json: PokemonSerializer.new(pokemon)
  end

  def create
    pokemon = Pokemon.new(pokemon_params)
    
    if pokemon.valid?
      pokemon.save
      render json: PokemonSerializer.new(pokemon), status: :accepted
    else 
      render json: { errors: pokemon.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def update
  	pokemon = Pokemon.find_by(id: params[:id])
    pokemon.update(pokemon_params)
    if pokemon.save
      render json: PokemonSerializer.new(pokemon), status: :accepted
    else
      render json: { errors: pokemon.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def pokemon_params
    params.permit(:name)
  end

end
