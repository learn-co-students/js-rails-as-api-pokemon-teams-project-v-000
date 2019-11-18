include 'pry'

class PokemonsController < ApplicationController

  def index
  end

  def show
  end

  def new
    binding.pry
    pokemon = Pokemon.new(name: params[:nickname], species: params[:species])
    pokemon.save

  end

  def delete
  end

end
