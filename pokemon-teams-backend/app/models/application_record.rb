class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  TEAM_LIMIT = 6
end
