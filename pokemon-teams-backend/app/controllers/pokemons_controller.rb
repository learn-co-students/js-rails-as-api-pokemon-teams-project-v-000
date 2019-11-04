class PokemonsController < ApplicationController
  def index
  	pokemons = Pokemon.all
  	options = {}
  	options[:include] = [:species, :nickname]
  	render json: PokemonSerializer.new(pokemons)
  end
end
