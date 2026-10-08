class SkillForgeException(Exception):
    """Base exception for SkillForge."""

    def __init__(self, message: str):
        self.message = message
        super().__init__(message)


class UserNotFoundException(SkillForgeException):
    pass


class SkillNotFoundException(SkillForgeException):
    pass


class JobNotFoundException(SkillForgeException):
    pass


class EvidenceNotFoundException(SkillForgeException):
    pass


class UnauthorizedException(SkillForgeException):
    pass


class DuplicateResourceException(SkillForgeException):
    pass