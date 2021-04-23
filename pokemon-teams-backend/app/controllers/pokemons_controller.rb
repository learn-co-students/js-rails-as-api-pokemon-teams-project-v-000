class PokemonsController < ApplicationController
  def create
    pokemon = Pokemon.create(
      species: Faker::Games::Pokemon.name,
      nickname: Faker::Name.first_name, 
      trainer_id: params[:trainer_id])

    render json: pokemon
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
    render json: pokemon
  end
end
