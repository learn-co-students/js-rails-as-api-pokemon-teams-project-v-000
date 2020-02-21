class Pokemon < ApplicationRecord
  belongs_to :trainer
  validate :team_size
  
TEAM_LIMIT = 6
  
private
  def pokemon_generator
    self.nickname =Faker::Games::Pokemon.name 
    self.species =Faker::Games::Pokemon.name
  end

  def team_size
     if self.trainer.pokemons.size >=TEAM_LIMIT
      errors[:base] << "Team Size Limit Reached, Release a Pokemon before Continuing"
     else
      pokemon_generator
     end
  end
  

  
  
  


end
