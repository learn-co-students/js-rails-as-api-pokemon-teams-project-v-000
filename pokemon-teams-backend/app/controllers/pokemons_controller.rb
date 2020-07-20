class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons.to_json
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    if pokemon
      render json: pokemon.to_json
    else
      render json: { message: 'No pokemon found with that id' }
    end
  end

  def create
    trainer = Trainer.find(params[:trainer_id])
    pokemon = trainer.pokemons.build({
      nickname: Faker::Name.first_name,
      species: Faker::Games::Pokemon.name
    })
    if pokemon.save
      render json: pokemon
    else
      {message: "create pokemon error"}
    end
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
  end
end
