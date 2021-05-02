class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def create
    @trainer = Trainer.find_by(id: params["trainer_id"])
    @trainer.team_full? ? already_full : create_pokemon
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    render json: pokemon
  end

  def destroy
    pokemon = Pokemon.find_by(id: params['id'])
    if pokemon
      pokemon.destroy
      render json: pokemon
    else
      render json: { error: 'No such pokemon' }, status: 404
    end
  end

  private

  def create_pokemon
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params["trainer_id"])
    render json: pokemon, status: 200
  end

  def already_full
    render json: { error: "Team is already full"}, status: 403
  end
end
