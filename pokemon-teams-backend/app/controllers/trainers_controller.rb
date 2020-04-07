class TrainersController < ApplicationController

  def index
    trainers = Trainer.all
    render json: trainers, include: [:pokemons]
  end

  def show
    trainer = Trainer.find_by(id: params[:id])
    render json: trainer.to_json(:only => [:id, :name], :include => {
      :pokemons => {:only => [:nickname, :species, :trainer_id]}
    })
  end
end
