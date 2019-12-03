class TrainersController < ApplicationController
  def index
  	trainer = Trainer.all
  	options = {}
  	options[:include] = [:name, :pokemons]
  	render json: TrainerSerializer.new(trainer)
  end

  def show 
  	trainer = Trainer.find(params[:id])
  	options = {
  		include: [:name, :pokemons]
  	}
  	
  	render json: TrainerSerializer.new(trainer, options)
  end
end
