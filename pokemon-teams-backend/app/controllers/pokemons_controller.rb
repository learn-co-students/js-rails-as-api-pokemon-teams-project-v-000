class PokemonsController < ApplicationController

  def create
    @pokemon = Pokemon.new
    @pokemon.nickname = Faker::Name.first_name
    @pokemon.species = Faker::Games::Pokemon.name
    @pokemon.trainer_id = params[:id]
    @pokemon.save
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
  end
end
