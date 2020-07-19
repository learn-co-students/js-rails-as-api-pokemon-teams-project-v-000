class Pokemon < ApplicationRecord
  belongs_to :trainer
  
  validate do 
    trainer_team_max?
  end
  
  private 

  def trainer_team_max?
    if self.trainer.pokemons.count >= 6 
      self.errors.add(:team_max, "Only 6 pokemon per team allowed.")
    end
  end
end
