require 'faker'

class PokemonsController < ApplicationController
  def create
    trainer = Trainer.find_by(params[:id])
    pokemon = trainer.pokemons.create(species: Faker::Games::Pokemon.name, nickname: Faker::Name.first_name)
    redirect_to json: pokemon

  def create
    trainer = Trainer.find_by(params[:id])
    pokemon = trainer.pokemons.create(species: Faker::Games::Pokemon.name, nickname: Faker::Name.first_name)
    redirect_to trainers_path
  end
end
