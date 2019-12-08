class TrainersController < ApplicationController
  #see all trainers on current team of pokemon

  def show
    trainer = Trainer.find_by(id: params[:id])
    render json: trainer.to_json
    #finding the trainer id in each pokemon. and relating that.
  end

  def index
    trainers = Trainer.all
    render json: trainers.to_json(:include => [:pokemons])
  end

end
