require 'faker'

class PokemonsController < ApplicationController
  def create
    trainer = Trainer.find_by(id: params[:trainer_id])
    if trainer.pokemons.count >= 6
      trainer.errors[:base] << "Looks like your roster is full! Please release a Pokemon before adding another to your team."
      render json: { :errors => trainer.errors[:base] }
    else
      pokemon = trainer.pokemons.create(species: Faker::Games::Pokemon.name, nickname: Faker::Name.first_name)
      render json: pokemon
    end
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
  end
end
