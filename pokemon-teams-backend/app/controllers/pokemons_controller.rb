class PokemonsController < ApplicationController
  def index
    if params[:trainer_id]
      @pokemons = Pokemon.where(:trainer_id=>params[:trainer_id])
    else
      @pokemons = Pokemon.all
    end
    render json: @pokemons
  end

  def show
  end
end
