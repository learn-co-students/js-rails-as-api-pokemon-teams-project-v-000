class PokemonsController < ApplicationController

  def create
    pokemon = Pokemon.new(:nickname => Faker::Name.first_name, :species => Faker::Games::Pokemon.name, :trainer_id => params[:trainer_id])
    render json: PokemonSerializer.new(pokemon)
  end

  def destroy
    pokemon = Pokemon.find_by(:id => params[:id])
    pokemon.delete
  end

end
