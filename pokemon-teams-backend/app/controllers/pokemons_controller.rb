class PokemonsController < ApplicationController
  before_action :check_trainers_pokemon_count, only: [:create]

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    if pokemon
      render json: PokemonSerializer.new(pokemon).to_serialized_json
    else
      render json: {error: "Pokemon not found with ID of #{params[:id]}!"}, status: 569
    end
  end

  def create
    pokemon = Pokemon.new.tap do |p|
      p.nickname = Faker::Name.first_name
      p.species = Faker::Games::Pokemon.name
      p.trainer = @trainer ||= Trainer.find(pokemon_params[:trainer_id])
    end

    if pokemon.save
      render json: "Successfully saved pokemon: #{PokemonSerializer.new(pokemon).to_serialized_json}"
    else
      render json: {error: "pokemons#create - Could not save pokemon: #{params[:id]} because of #{pokemon.errors}"}, status: 569
    end
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    if pokemon && pokemon.destroy
      render json: "Successfully deleted pokemon: #{PokemonSerializer.new(pokemon).to_serialized_json}"
    else
      render json: {error: "pokemons#destroy - Pokemon not found with ID of #{params[:id]}!"}, status: 569
    end
  end

private

  def pokemon_params
    params.require(:pokemon).permit(:trainer_id)
  end

  def check_trainers_pokemon_count

    @trainer = Trainer.find_by(id: pokemon_params[:trainer_id])

    if @trainer.pokemons.count >= 5
      render json: {error: "Trainer #{@trainer.name}, You don't have room in your team for another pokemon!"}
    end
  end

end
