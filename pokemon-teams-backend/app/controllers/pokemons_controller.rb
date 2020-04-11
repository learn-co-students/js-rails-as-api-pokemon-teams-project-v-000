class PokemonsController < ApplicationController

  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def create

    trainer = Trainer.find(params["pokemon"]["trainer_id"])

    if trainer.pokemons.count >= 6
      render json: {error: "Too many Pokemons"}

    else
      pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer: trainer)
      render json: pokemon

    end
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
      unless pokemon.nil?
        pokemon.destroy
        render json: pokemon
      else
        render json:{error: "Pokemon not Found"}
      end
    end


end
