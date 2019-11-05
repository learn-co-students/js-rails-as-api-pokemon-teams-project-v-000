class PokemonsController < ApplicationController
  def create
    trainer_id = params[:trainerId].to_i
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer_id)

    render json: pokemon.to_json(only: [:id, :nickname, :species])
  end

  def destroy
    id = params[:id].to_i
    Pokemon.find(id).destroy
  end
end
