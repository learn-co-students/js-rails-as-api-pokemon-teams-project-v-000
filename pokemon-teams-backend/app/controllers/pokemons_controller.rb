class PokemonsController < ApplicationController
  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name

    pokemon = Pokemon.new(pokemon_params)
    pokemon.nickname = name
    pokemon.species = species
    pokemon.save
    render json: pokemon, except: %i[updated_at created_at]
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    render json: pokemon, except: %i[updated_at created_at]
    pokemon.destroy
  end

  private

  def pokemon_params
    params.require(:pokemon).permit(:id, :nickname, :species, :trainer_id)
  end
end
