class PokemonsController < ApplicationController

  def index
    pokemons = Pokemon.all
    #render plain: "Hello team!"
    render json: PokemonSerializer.new(pokemons).to_serialized_json
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

  def create
    pokemon = Pokemon.new(trainer_id: params[:trainer_id], nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
    trainer = Trainer.find_by(id: params[:trainer_id])
    if trainer.pokemons.count <6
      pokemon.save
      render json: PokemonSerializer.new(pokemon).to_serialized_json
    else
      render json: { message: "This trainer already has 6 pokemon."}
    end
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
  end
end
