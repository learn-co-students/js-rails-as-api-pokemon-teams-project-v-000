require "faker"

class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons, except: [:created_at, :updated_at]
  end

  def create
    trainer = Trainer.find_by(id: params[:trainer_id])
    nickname = Faker::Name.first_name
    species = Faker::Games::Pokemon.name

    if trainer && trainer.pokemons.count < 6
      pokemon = trainer.pokemons.create(nickname: nickname, species: species, trainer_id: trainer.id)
    end
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
  end
end
